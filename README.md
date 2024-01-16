Next.js로 마이그레이션하고 이어서 작업

## Next.js로 마이그레이션하게 된 이유

Vercel을 통해 배포하고 있었는데, Backend 처리를 하기 위해 다음과 같은 선택지가 있었다.

- Vercel의 서버리스 함수 이용
- 별도의 Backend 구성

별도의 Backend를 구성할 것까진 없다고 생각이 들어 첫 번째 방법으로 진행하도록 했다. 이를 위해 프로젝트 루트에 `/api` 경로 아래에 이러저러한 코드를 넣었는데, 아래와 같은 문제점들이 있었다.

- 모노레포를 사용하지 못한다. 배포 환경에선 문제가 없으나, `vercel dev` 환경에서는 지원되지 않는다. 이는 개발 과정에서 치명적이었다. 결국 이 때문에 모노레포를 들어냈으나...
- 철저히 `/api` 안의 모듈만 이용해야 한다. -> 외부에 type을 선언해놓으면 프런트에서도 접근할 수 있으니 더 나을텐데, 그게 어렵다.

이러저러한 이유를 따지다보니 그냥 Next.js에서 풀스택으로 개발하는 게 훨씬 깔끔하고 유지보수하기도 좋으며, 배포 환경에 더 독립적이라 생각했다.

### Dev 모드

vercel의 serverless functions을 사용하기 때문에 `vercel CLI` 사용해야 함

```sh
$ vercel dev
```

