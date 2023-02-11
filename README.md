# 지방자치단체 세부사업별 세출 내역

정책 전문가패널 구축을 통한 정책랩 제안

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

GCP CLI 로그인

```bash
gcloud init
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

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_LOCATION="asia-northeast3",_REPOSITORY="lofin-seoul",_IMAGE="lofin-crawler" .
```

Cloud Run Task 생성

```bash
gcloud beta run jobs delete lofin-crawler \
  --region asia-northeast3
gcloud beta run jobs create lofin-crawler \
  --env-vars-file "./.env task" \
  --image asia-northeast3-docker.pkg.dev/lofin-2023/lofin-seoul/lofin-crawler:latest \
  --max-retries 2 \
  --memory 1Gi \
  --region asia-northeast3 \
  --set-cloudsql-instances lofin-2023:asia-northeast3:lofin \
  --tasks 100 \
  --task-timeout 3600
```

Cloud Run Task 실행

```
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

VPC 생성

독립된 클라우드 네트워크 단위

- 퍼블릭 서브넷 2개
- 프라이빗 서브넷 2개
- 라우팅 테이블 3개
- 네트워크 연결 2개

EC2 생성

- SSH 접속 키 생성
- 아까 생성한 VPC의 퍼블릭 서브넷 할당
- 퍼블릭 IP 할당
- 인바운드: SSH (0.0.0.0/0:22)
- 아웃바운드:
  - PostgreSQL (RDS보안그룹:5432)
  - HTTPS (0.0.0.0/0:443)
  - HTTP (0.0.0.0/0:80)
  - SSH (0.0.0.0/0:22)

RDS

- EC2랑 동일한 서브넷
- 인바운드: EC2 (EC2보안그룹:5432)
