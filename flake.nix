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
        in
        {
          devShells.default = pkgs.mkShell {
            buildInputs = [ node pkgs.postgresql pkgs.jq pkgs.claude-code pkgs.nixfmt];
          };
          formatter = pkgs.nixpkgs-fmt;
          packages.default =
            let
              buildModules = pkgs.runCommand "node_modules" { } ''
                mkdir $out; cd $out
                cp ${./package.json} package.json
                ${pkgs.node2nix}/bin/node2nix -d -l ${./package-lock.json}
              '';
              generated = import buildModules { pkgs = pkgs; nodejs = node; };

              foo = pkgs.stdenv.mkDerivation {
                name = "test";
                buildInputs = [ pkgs.nodejs pkgs.postgresql pkgs.jq ];
                src = pkgs.nix-gitignore.gitignoreSourcePure [ ./.gitignore ] ./.;
                buildPhase = ''
                  bash ./start_postgres.sh
                  cp -rT --no-preserve=ownership ${generated.nodeDependencies}/lib/node_modules ./node_modules
                  chmod -R u+rw ./node_modules
                  export PATH=$PWD/node_modules/.bin:$PATH

                  mkdir $out
                  ln -s $out ./node_modules/.vitest

                  psql -U postgres -h localhost -p 1234 < <(echo "create database test")

                  bash ./src/gen/gen.sh

                  npm run typecheck
                  npm run lint


                  kysely --no-outdated-check migrate:up -e test

                  npm run test
                '';
              };
            in
            foo;
        }
      );
}
