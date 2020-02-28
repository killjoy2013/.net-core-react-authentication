FROM artifactory.turkcell.com.tr/docker-local/public/node:carbon-jessie AS node-builder
COPY . /app
WORKDIR /app/noderunnerweb2
RUN npm install --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/ 
RUN npm run build

#Prepare dotnet:sdk image
FROM artifactory.turkcell.com.tr/local-docker-dist-dev/com/turkcell/noderunner/mcr.microsoft.com/dotnet/core/sdk:3.1 AS dotnet-builder
WORKDIR /app
COPY . /app

RUN dotnet restore ./reactsample.csproj -s https://artifactory.turkcell.com.tr/artifactory/api/nuget/nuget/
RUN dotnet publish --no-restore ./reactsample.csproj -c Release -o out

COPY --from=node-builder /app/noderunnerweb2/build /app/out/noderunnerweb2/build

#RUN dotnet --version

FROM artifactory.turkcell.com.tr/local-docker-dist-dev/com/turkcell/noderunner/mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

COPY turkcellRootca2Der.cer /etc/ssl/certs/turkcellRootca2Der.pem
COPY certs/cert.key /etc/ssl/certs/cert.key
COPY certs/cert.pem /etc/ssl/certs/cert.pem

WORKDIR /etc/ssl/certs/
RUN chmod 777 turkcellRootca2Der.pem 
RUN ln -s turkcellRootca2Der.pem `openssl x509 -hash -noout -in turkcellRootca2Der.pem`.0

USER 10001
WORKDIR /app
COPY --from=dotnet-builder /app/out /app
EXPOSE 55291
ENV ASPNETCORE_URLS="https://+:55291"
ENTRYPOINT ["dotnet", "reactsample.dll"]
