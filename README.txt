membership-app-client
1. npm install
2. npm run dev

membership-app-server
1. Buka Web.config
2. Cari element connectionStrings dan value connectionString
3. Ganti value "DESKTOP-FF0E7DE\SQLEXPRESS" dengan nama database local
4. Buka package manager console
5. run "Enable-Migrations"
6. run "Add-Migration InitialCreate"
7. run "Update-Database"

seed.sql untuk seed data province dan city (foreign key province_id)

.net framework external package (if needed)
1. "Install-Package" EntityFramework
2. "Install-Package Unity"
3. "Install-Package Unity.WebApi"
4. "Install-Package Microsoft.AspNet.WebApi.Cors"
