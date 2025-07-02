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
            config.allowUnfree = true;
          };
          node = pkgs.nodejs_20;
          bootstrapped =
            let
              buildModules = pkgs.runCommand "node_modules" { } ''
                mkdir $out; cd $out
                cp ${./package.json} package.json
                ${pkgs.node2nix}/bin/node2nix -d -l ${./package-lock.json}
              '';
              generated = import buildModules { pkgs = pkgs; nodejs = node; };

              buildModulesSite = pkgs.runCommand "node_modules" { } ''
                mkdir $out; cd $out
                cp ${./site/package.json} package.json
                ${pkgs.node2nix}/bin/node2nix -d -l ${./site/package-lock.json}
              '';
              generatedSite = import buildModulesSite { pkgs = pkgs; nodejs = node; };
            in
            pkgs.stdenv.mkDerivation {
              name = "bootstrapped.tar";
              buildInputs = [ pkgs.nodejs pkgs.postgresql pkgs.jq ];
              src = pkgs.nix-gitignore.gitignoreSourcePure [ ./.gitignore ] ./.;
              buildPhase = ''
                bash ./start_postgres.sh

                cp -rT --no-preserve=ownership ${generated.nodeDependencies}/lib/node_modules ./node_modules
                chmod -R u+rw ./node_modules

                cp -rT --no-preserve=ownership ${generatedSite.nodeDependencies}/lib/node_modules ./site/node_modules
                chmod -R u+rw ./site/node_modules

                psql -U postgres -h localhost -p 1234 < <(echo "create database test")

                export PATH=$PWD/node_modules/.bin:$PATH
                bash ./src/gen/gen.sh

                #ls -lrath ./node_modules/.bin >&2
                #exit 1
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
            buildInputs = [ node pkgs.postgresql pkgs.jq pkgs.claude-code pkgs.nixfmt ];
          };
          formatter = pkgs.nixpkgs-fmt;

          packages = rec {
            typegres =

              pkgs.stdenv.mkDerivation {
                name = "typegres";
                buildInputs = [ pkgs.nodejs pkgs.postgresql pkgs.jq ];
                src = bootstrapped;
                buildPhase = ''
                  export PATH=$PWD/node_modules/.bin:$PATH
                  npm run build
                '';

                installPhase = ''
                  mkdir -p $out
                  cp -r ./dist $out/lib
                  cp package.json $out/lib/package.json
                  cp README.md $out/lib/README.md
                  cp LICENSE $out/lib/LICENSE
                '';

                checkPhase = ''
                  #mkdir $out
                  #ln -s $out ./node_modules/.vitest

                  npm run typecheck
                  npm run lint
                  npm run test
                '';
              };

            site =
              pkgs.stdenv.mkDerivation {
                name = "typegres-site";
                buildInputs = [ pkgs.nodejs ];
                src = bootstrapped;
                buildPhase = ''
                  cd ./site
                  export PATH=$PWD/node_modules/.bin:$PATH

                  npm run build
                  exit 1
                '';
                installPhase = ''
                  mkdir -p $out
                  exit 2
                  mv ./site/dist $out
                '';
              };

            default = typegres;

          };
        }
      );
}
