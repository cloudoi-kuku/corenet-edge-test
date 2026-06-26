# CoreNet edge test site

Minimal static site + SWA managed API for validating **G10** (`GET /api/hello`, `GET /api/health`).

## Layout

```
src/index.html          # static frontend (output directory: src)
api/hello/              # GET /api/hello
api/health/             # GET /api/health
api/host.json
corenet.json            # edge.apiLocation manifest
```

## Push to GitHub

```bash
cd Platform/samples/edge-static-test
git init
git add .
git commit -m "Add CoreNet edge test site"
gh repo create corenet-edge-test --public --source=. --push
# or: git remote add origin git@github.com:YOU/corenet-edge-test.git && git push -u origin main
```

## Create site in CoreNet

1. **New site** → Static hosting → connect the GitHub repo above.
2. **Build settings** (wizard should auto-detect):
   - Output directory: `src`
   - Build command: *(empty)*
   - Install command: `skip`
   - Edge API folder: `api` (from framework detection or `corenet.json`)
3. **Deploy** (manual or push to `main`).
4. Verify:
   - `https://<your-site>.azurestaticapps.net/api/hello`
   - `https://<your-site>.azurestaticapps.net/api/health`
   - Open the site URL — the page fetches `/api/hello` and shows JSON.

## Optional: managed Postgres

Attach a managed database on Site Settings, redeploy, then extend `api/hello/index.js` to read `process.env.DATABASE_URL`.