{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };
          node = pkgs.nodejs_22;
          buildModulesSite = pkgs.runCommand "node_modules" { } ''
            mkdir $out; cd $out
            cp ${./site/package.json} package.json
            ${pkgs.node2nix}/bin/node2nix -d -l ${./site/package-lock.json}
          '';
          generatedSite = (import buildModulesSite { pkgs = pkgs; nodejs = node; }).nodeDependencies.overrideAttrs (oldAttrs: {
            # There's an issue with napi-postinstall that isn't marked executable when the first patchShebangs is run.
            preRebuild = ''
              echo "Patching shebangs in node_modules/napi-postinstall/lib" >&2
              chmod +x node_modules/napi-postinstall/lib/cli.js
              patchShebangs node_modules/napi-postinstall/lib/cli.js
              echo "Patching shebangs done" >&2
            '';
          });
          buildModules = pkgs.runCommand "node_modules" { } ''
            mkdir $out; cd $out
            cp ${./package.json} package.json
            ${pkgs.node2nix}/bin/node2nix -d -l ${./package-lock.json}
          '';
          generated = import buildModules { pkgs = pkgs; nodejs = node; };
          bootstrapped =
            pkgs.stdenv.mkDerivation {
              name = "bootstrapped.tar";
              buildInputs = [ pkgs.nodejs pkgs.postgresql pkgs.jq ];
              src = pkgs.nix-gitignore.gitignoreSourcePure [ ./.gitignore ] ./.;
              buildPhase = ''
                export PATH=$PWD/node_modules/.bin:$PWD/bin:$PATH
                patchShebangs ./bin

                bash ./start_postgres.sh

                cp -rT --no-preserve=ownership ${generated.nodeDependencies}/lib/node_modules ./node_modules
                chmod -R u+rw ./node_modules

                cp -rT --no-preserve=ownership ${generatedSite}/lib/node_modules ./site/node_modules
                chmod -R u+rw ./site/node_modules

                psql -U postgres -h localhost -p 1234 < <(echo "create database test")

                export PATH=$PWD/node_modules/.bin:$PATH
                npm run codegen
              '';

              installPhase = ''
                cur=$(pwd)
                cd /tmp
                mv $cur /tmp/source
                tar -cf $out ./source
              '';
            };
        in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [ node pkgs.postgresql pkgs.jq pkgs.nixfmt-classic ];
            shellHook = ''
              export PATH="$PWD/bin:$PATH"
            '';
          };
          formatter = pkgs.nixfmt-classic;

          packages = rec {
            typegres =
              pkgs.stdenv.mkDerivation {
                name = "typegres";
                buildInputs = [ pkgs.nodejs pkgs.postgresql pkgs.jq ];
                src = bootstrapped;
                buildPhase = ''
                  export PATH=$PWD/node_modules/.bin:$PWD/bin:$PATH
                  npm run build

                  npm run typecheck
                  npm run lint
                  npm run format:check
                  
                  bash ./start_postgres.sh
                  kysely --no-outdated-check migrate:up -e test

                  npm run test
                '';

                installPhase = ''
                  export HOME=$(mktemp -d)
                  mkdir $out
                  npm pack --pack-destination $out
                '';
              };

            site =
              pkgs.stdenv.mkDerivation {
                name = "typegres-site";
                buildInputs = [ pkgs.nodejs ];
                src = bootstrapped;
                buildPhase = ''
                  # Build site
                  cd ./site
                  export PATH=$PWD/node_modules/.bin:$PATH
                  npm run build
                '';
                installPhase = ''
                  mv ./out $out
                '';
              };

            typegres-examples =
              pkgs.stdenv.mkDerivation {
                name = "typegres-examples";
                buildInputs = [ pkgs.nodejs ];
                src = pkgs.nix-gitignore.gitignoreSourcePure [ ./.gitignore ] ./examples;
                buildPhase = ''
                  # Create a tarball from the built typegres dist folder
                  # Install dependencies
                  cp -rT --no-preserve=ownership ${generated.nodeDependencies}/lib/node_modules ./node_modules
                  chmod -R u+rw ./node_modules
                  
                  # Install typegres
                  echo "Installing typegres from tarball" >&2
                  mkdir ./node_modules/typegres
                  tar -xf ${typegres}/typegres-*.tgz --strip-components=1 -C ./node_modules/typegres

                  echo "Running example tests" >&2
                  # Run example tests (which use PGLite)
                  npm test
                '';
                installPhase = ''
                  mkdir $out
                  echo "Examples tested successfully" > $out/result.txt
                '';
              };

            default = typegres;
            inherit node;
            inherit pkgs;
          };
        }
      );
}
