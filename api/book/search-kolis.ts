/**
 * 국가자료종합목록 검색 API 활용
 * https://www.nl.go.kr/NL/contents/N31101030400.do
 * 
 * @author Hogyun Jeon <akzm9999@gmail.com>
 */

// TODO: 상세검색 구현

import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
// import { Pagination } from "../_type";

const baseURL = "https://www.nl.go.kr/NL/search/openApi";

interface SearchKolisNetRequestParams {
  key: string;
  srchTarget?: "total" | "title" | "author" | "publisher";
  kwd: string; // optional 필드이지만, 이 경우 상세검색이므로 단순검색만 구현한 현재로서는 필수 값. 
  pageNum: number;
  pageSize: number;
  sort?: "ititle" | "iauthor" | "ipublisher" | "ipub_year" | "cheonggu";
  desc?: "asc" | "desc";
}

interface SearchKolisNetResponseBody {
  "root": {
    "paramData": {
      "kwd": string;
      "category": "kolisNet";
      "pageNum": number,
      "pageSize": number,
      "sort": string;
      "total": number
    },
    "result": {
      "item":
      {
        "title_info": string;
        "type_name": string;
        "place_info": string;
        "author_info": string;
        "pub_info": string;
        "menu_name": string;
        "media_name": string;
        "manage_name": string;
        "pub_year_info": number;
        "control_no": string;
        "doc_yn": string;
        "org_link": string;
        "id": number,
        "place_code": string;
        "type_code": string;
        "lic_yn": string;
        "lic_text": string;
        "reg_date": string;
        "isbn": string;
        "call_no": string;
        "kdc_code_1s": string;
        "kdc_name_1s": string;
      }[],
    }
  }
}

const $SearchParams = z.object({
  kwd: z.string(),
});

// interface ResponseBody extends Pagination {
//   items: {
//     title: string;
//     type: string;
//     authors: string;
//     publisher: string;
//     pubYear: number;
//     isbn: string;
//   }[],
// }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(400).end("잘못된 요청입니다.");

  try {
    const {
      kwd
    } = $SearchParams.parse(req.query);

    const kolisResponse = await axios.get("/searchKolisNet.do", {
      baseURL,
      params: {
        key: process.env.KOLIS_API_KEY as string,
        kwd,
        pageNum: 1,
        pageSize: 10,
      } satisfies SearchKolisNetRequestParams,
    });

    const xmlParser = new XMLParser();
    const kolisResult = xmlParser.parse(kolisResponse.data, { allowBooleanAttributes: true }) as SearchKolisNetResponseBody;

    const root = kolisResult.root;

    res.json(root);

    // res.json({
    //   page: root.paramData.pageNum,
    //   pageSize: root.paramData.pageSize,
    //   pageCount: Math.ceil(root.paramData.total / root.paramData.pageSize),
    //   totalCount: root.paramData.total,
    //   items: root.result.item.map((it) => ({

    //   }))
    // } satisfies ResponseBody);
  } catch (e) {
    res.status(500).json(e);
  }
}
