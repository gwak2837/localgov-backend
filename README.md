# 지방자치단체 세부사업별 세출 내역

정책 전문가패널 구축을 통한 정책랩 제안

## 프로젝트 메모

## 💻 개발 환경

- macOS 12.6
- [Node.js](https://nodejs.org/en/) 18.12
- [Yarn](https://yarnpkg.com/getting-started/install#install-corepack) 3.3
- [Git](https://git-scm.com/download) 2.38

- docker
- gcloud CLI

## ☁ 클라우드

- [AWS EC2](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#Instances:)
- [AWS RDS](https://ap-northeast-2.console.aws.amazon.com/rds/home?region=ap-northeast-2#databases:)

## 클라우드 설정

#### cloud-sql-proxy 다운로드

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.1.2/cloud-sql-proxy.darwin.arm64
chmod +x cloud-sql-proxy
```

#### GCP CLI 로그인

https://cloud.google.com/sdk/docs/install?hl=ko

```bash
gcloud init
gcloud auth application-default login
```

#### Cloud SQL 설정

PostgreSQL 서버에 접속해서 아래와 같이 사용자와 데이터베이스를 생성합니다. PostgreSQL 기본 관리자 이름은 `postgres` 입니다.

```sql
CREATE USER 사용자이름 WITH PASSWORD '사용자비밀번호';
\c DB이름 DB관리자이름
\du
CREATE DATABASE DB이름 OWNER 사용자이름 TEMPLATE template0 LC_COLLATE "C" LC_CTYPE "ko_KR.UTF-8";
\l
ALTER SCHEMA public OWNER TO 사용자이름;
\dn
\c DB이름 DB관리자이름
```

Artifact Registry 저장소 생성

```bash
gcloud artifacts repositories create lofin-seoul \
  --location=asia-northeast3 \
  --repository-format=docker
```

cloudbuild.yml 생성

```yml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}', '.']
images:
  - '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}'
```

Cloud Build 결과물을 Artifact Registry 저장소에 저장

Cloud Run Task 생성 및 실행

```bash
yarn build:crawler
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_LOCATION="asia-northeast3",_REPOSITORY="lofin-seoul",_IMAGE="lofin-crawler" .
gcloud beta run jobs delete lofin-crawler \
  --region asia-northeast3
gcloud beta run jobs create lofin-crawler \
  --cpu 2 \
  --env-vars-file "./.env task" \
  --execute-now \
  --image asia-northeast3-docker.pkg.dev/lofin-2023/lofin-seoul/lofin-crawler:latest \
  --max-retries 0 \
  --memory 1Gi \
  --region asia-northeast3 \
  --set-cloudsql-instances lofin-2023:asia-northeast3:lofin \
  --tasks 30 \
  --task-timeout 3600
gcloud beta run jobs execute lofin-crawler
```

Cloud Build 설정

```
gcloud projects add-iam-policy-binding lofin-376407 \
    --member=serviceAccount:$(gcloud projects describe lofin-376407 \
    --format="value(projectNumber)")-compute@developer.gserviceaccount.com \
    --role="roles/clouddeploy.jobRunner"
gcloud iam service-accounts add-iam-policy-binding $(gcloud projects describe lofin-376407 \
    --format="value(projectNumber)")-compute@developer.gserviceaccount.com \
    --member=serviceAccount:$(gcloud projects describe lofin-376407 \
    --format="value(projectNumber)")-compute@developer.gserviceaccount.com \
    --role="roles/iam.serviceAccountUser" \
    --project=lofin-376407
gcloud projects add-iam-policy-binding lofin-376407 \
    --member=serviceAccount:$(gcloud projects describe lofin-376407 \
    --format="value(projectNumber)")-compute@developer.gserviceaccount.com \
    --role="roles/run.developer"

```
