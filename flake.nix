{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = fn: nixpkgs.lib.genAttrs systems (system: fn {
        pkgs = nixpkgs.legacyPackages.${system};
      });
    in
    {
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            postgresql_17
            act  # run GitHub Actions workflows locally (needs Docker on host)
          ];
          shellHook = ''
            # DATABASE_URL points at the per-repo socket provisioned by
            # bin/startpg. Hash the repo root so parallel checkouts stay
            # isolated. Honor a pre-existing DATABASE_URL (e.g. CI).
            if [ -z "''${DATABASE_URL:-}" ]; then
              repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
              hash="$(printf '%s' "$repo_root" | sha256sum | cut -c1-12)"
              sock="/tmp/typegres-pg-$hash/socket"
              export DATABASE_URL="postgresql:///postgres?host=$sock"
            fi
          '';
        };
      });
    };
}
