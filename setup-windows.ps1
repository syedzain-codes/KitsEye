$ErrorActionPreference = 'Stop'
Write-Host 'Installing KitsEye dependencies...' -ForegroundColor Cyan
npm install
npm --prefix server install
npm --prefix client install
if (!(Test-Path 'server/.env')) {
  Copy-Item 'server/.env.example' 'server/.env'
  Write-Host 'Created server/.env. Edit MONGO_URI and JWT_SECRET before starting.' -ForegroundColor Yellow
}
Write-Host 'Setup complete. Start MongoDB, then run: npm run seed; npm run dev' -ForegroundColor Green
