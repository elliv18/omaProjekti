# Vinyylien arkistointi sovellus

### Local development
- Clone
- go to project folder
- cd backend && run yarn install
- cd .. && cd frontend && yarn install
- cd .. (project root folder)
- `docker-compose up - d`

> ### Logs
- **All logs:** `docker-comspose logs -f`
- **Frontend logs:** `docker-comspose logs -f frontend`
- **Backend logs:** `docker-comspose logs -f backend`

### Start requires aws credentials.json file and .env
**credentials.json (/backend)**

    {
    "accessKeyId": "xxx",
    "secretAccessKey": "xxx",
    "region": "xx-yyy-1"
    }

**Example .env** (project root folder)
 
    NODE_ENV=development
    SALT_ROUNDS=10
    JWT_SECRET=123

    AWS_BUCKET_NAME=your bucket name here

    USE_AUTH=true

    ROOT_ADMIN_EMAIL=1
    ROOT_ADMIN_PASS=1
    ROOT_ADMIN_NAME=admin

    REACT_APP_PUBLIC_URL=
    REACT_APP_BACKEND_PORT_DEV=3050
    REACT_APP_BACKEND_PORT_PROD=4000
