@echo off
set a=Empresa
for /f %%i in (Fich-prov.txt) do (
md %A%\%%i
for /f %%h in (departamento.txt) do (
md %A%\%%i\%%h
for /f %%g in (tipo.txt) do (
md %A%\%%i\%%h\%%g
)
)
)