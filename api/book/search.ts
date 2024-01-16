/**
 * 국가자료종합목록 검색 API 활용
 * https://www.nl.go.kr/NL/contents/N31101030400.do
 * 
 * @author Hogyun Jeon <akzm9999@gmail.com>
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { z } from "zod";
import { Pagination } from "../_type";

const baseURL = "https://www.nl.go.kr/NL/search/openApi";

interface SearchNlBooksRequestParams {
  key: string;
  srchTarget?: "total" | "title" | "author" | "publisher" | "cheonggu"; // 생략 시 전체
  kwd: string; // optional 필드이지만, 이 경우 상세검색이므로 단순검색만 구현한 현재로서는 필수 값. 
  pageNum: number;
  pageSize: number;
  systemType?: "오프라인자료" | "온라인자료";
  category?: "도서" | "고문헌" | "학위논문" /* 생략 */;
  lnbTypeName?: string;
  offerDcode2s?: string;
  sort?: "ititle" | "iauthor" | "ipublisher" | "ipub_year" | "cheonggu";
  order?: "asc" | "desc";
  apiType?: "xml" | "json";
  licYn?: string;
  govYn?: "Y" | "N";
}

interface SearchNlBooksResponseBody {
  "total": number,
  "kwd": string,
  "pageNum": number,
  "pageSize": number,
  "category": SearchNlBooksRequestParams["category"] | "",
  "sort": SearchNlBooksRequestParams["sort"] | "'",
  "result": {
    "titleInfo": string; // kwd와 일치하는 부분을 <span class="searching_txt">로 감싸줌
    "typeName": string;
    "placeInfo": string;
    "authorInfo": string;
    "pubInfo": string;
    "menuName": string;
    "mediaName": string;
    "manageName": string;
    "pubYearInfo": string;
    "controlNo": string;
    "docYn": string;
    "orgLink": string;
    "id": string;
    "typeCode": string;
    "licYn": string;
    "licText": string;
    "regDate": string;
    "detailLink": string;
    "isbn": string;
    "callNo": string;
    "kdcCode1s": string;
    "kdcName1s": string;
    "classNo": string;
    "imageUrl": string;
  }[],
}

function replaceSearchingTxt(text: string) {
  return text.replace(/<span class="searching_txt">(.*)<\/span>/gi, "<strong>$1</strong>");
}

const $SearchParams = z.object({
  query: z.string(),
  page: z.number().or(z.string()).nullish(),
});

export type RequestParams = z.infer<typeof $SearchParams>;

export interface ResponseBody extends Pagination {
  items: {
    title: string;
    type: string;
    authors: string;
    publisher: string;
    pubYear: number;
    isbn: string;
    imageUrl: string;
  }[],
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(400).end("잘못된 요청입니다.");

  try {
    const {
      query,
      page,
    } = $SearchParams.parse(req.query);

    const nlResponse = await axios.get("/search.do", {
      baseURL,
      params: {
        key: process.env.KOLIS_API_KEY as string,
        apiType: "json",
        category: "도서",
        kwd: query,
        pageNum: page as number,
        pageSize: 12,
      } satisfies SearchNlBooksRequestParams,
    });

    const nld = nlResponse.data as SearchNlBooksResponseBody;

    res.json({
      meta: {
        page: nld.pageNum,
        pageSize: nld.pageSize,
        pageCount: Math.ceil(nld.total / nld.pageSize),
        totalCount: nld.total,
      },
      items: nld.result.map((it) => ({
        title: replaceSearchingTxt(it.titleInfo),
        authors: replaceSearchingTxt(it.authorInfo),
        publisher: replaceSearchingTxt(it.pubInfo),
        pubYear: Number(it.pubYearInfo),
        isbn: it.isbn,
        type: it.typeCode,
        imageUrl: it.imageUrl,
      })),
    } satisfies ResponseBody);
  } catch (e) {
    res.status(500).json(e);
  }
}
