# HOW TO RUN

Install mssql version with docker at your computer, running on door: 1433 ( if you choose another, please, alter ormconfig.json)

Run all migrations ( this is going to create all necessary databases )
``` yarn typeorm migration:run ```

If something went wrong, or you want to change some migration, run:
``` yarn typeorm migration:revert ```

**This command will reverse only the last one migration.**

Install all dependencies using yarn
``` yarn ```

RUN WITH YARN:
``` yarn start:dev ```