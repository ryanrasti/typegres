FROM node:22-bookworm-slim AS build
WORKDIR /src

COPY . .
RUN npm ci --legacy-peer-deps \
 && npm run build \
 && npm ci --legacy-peer-deps --prefix examples/oracle-notes \
 && npm run build --prefix examples/oracle-notes \
 && npm prune --omit=dev --prefix examples/oracle-notes \
 && rm -rf examples/oracle-notes/node_modules/typegres \
 && mkdir -p examples/oracle-notes/node_modules/typegres \
 && cp package.json examples/oracle-notes/node_modules/typegres/package.json \
 && cp -r dist examples/oracle-notes/node_modules/typegres/dist

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production PORT=3000
WORKDIR /app

COPY --from=build /src/examples/oracle-notes/dist ./dist
COPY --from=build /src/examples/oracle-notes/dist-server ./dist-server
COPY --from=build /src/examples/oracle-notes/node_modules ./node_modules
COPY --from=build /src/examples/oracle-notes/package.json ./package.json

USER node
EXPOSE 3000
CMD ["node", "dist-server/index.mjs"]
