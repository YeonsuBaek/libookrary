# 라이북러리

나만의 가상 책꽂이를 만들어보세요! 📚

## 소개

- **작업 기간** | 2024.05.01 - 07.04
- **구성원** | 1명 (기여도 100%)
- **배포** | [https://libookrary.vercel.app](https://libookrary.vercel.app)

## 기술

- **Skill** | Next.js, TypeScript, Sass, Firebase, Git  
- **Library** | [YEONSUI](https://github.com/YeonsuBaek/yeonsui), [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)

## 주요 기능

| **회원가입 및 로그인** | **도서 검색** |
| --- | --- |
| ![](https://velog.velcdn.com/images/yeonsubaek/post/9418475c-c233-43fa-a958-922529863bed/image.gif) | ![](https://velog.velcdn.com/images/yeonsubaek/post/3bb43062-f11d-43f7-9279-845b4aed48da/image.gif) |
| **책꽂이 및 카드 목록** | **독서 내역 저장** |
| ![](https://velog.velcdn.com/images/yeonsubaek/post/b7f4b92b-ab94-4868-a218-276c224d179f/image.gif) | |
| **독서 내역 삭제** | **독서 내역 수정** |
| ![](https://velog.velcdn.com/images/yeonsubaek/post/bd70136d-ea37-4922-9bbe-d4abaca0e515/image.gif) | ![](https://velog.velcdn.com/images/yeonsubaek/post/fc229c1c-07e3-4726-9a44-ac48489e212a/image.gif) |
| **회원 정보 및 언어 수정** | **테마 설정** |
| ![](https://velog.velcdn.com/images/yeonsubaek/post/5598b3c4-b4dc-4a6a-b4e5-b93e05d8d1e8/image.gif) | ![](https://velog.velcdn.com/images/yeonsubaek/post/224d517f-c735-43ca-8b1d-f348ded4d53c/image.gif) |

## 포스트

- SSR 관련 트러블슈팅
  - [다크모드 적용하기](https://yeonsu.hashnode.dev/ssr-dark-mode)
  - [페이지 로딩 UX 개선](https://yeonsu.hashnode.dev/ssr-loading)
  - [API Routes CORS 에러](https://yeonsu.hashnode.dev/nextjs-api-routes-cors)
  - [Hydration 에러](https://yeonsu.hashnode.dev/nextjs-ui-hydration)
- 검색 기능 관련 트러블슈팅
  - [무한스크롤 문제](https://yeonsu.hashnode.dev/react-infinite-scroll-issue)
  - [무한스크롤 위치 기억](https://yeonsu.hashnode.dev/nextjs-popstate)
  - [실시간 기능 없앤 이유와 대안](https://yeonsu.hashnode.dev/react-url)
- API 관련 트러블슈팅
  - [알라딘 API 삽질 과정](https://yeonsu.hashnode.dev/aladin-api)
 
## 후기

- SSR을 처음 다뤄보았다. CSR과 SSR의 차이점, 브라우저 렌더링 과정을 공부하여 에러를 해결하였다.
- 로딩, 페이지 히스토리, 주요 기능이 동작하기 전후 알림에 대해 대응하며 프론트엔드 개발자로서의 목표였던 사용자 경험을 높였다.
- 로그인 정보와 테마 정보를 localStorage에 저장해 관리해서 SSR을 다루는데 어려움이 있으므로 개선이 필요하다.

## 참여하기

다음 버전이 필요합니다: Node.js 16.20.2, Npm 8.19.2

```
git clone https://github.com/YeonsuBaek/libookrary.git
npm install
npm run dev
```
