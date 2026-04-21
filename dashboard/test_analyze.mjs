import fs from 'fs';

const key = fs.readFileSync('.env', 'utf8').match(/VITE_GEMINI_API_KEY=(.+)/)[1].trim();
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=' + key;

const body = {
    contents: [{ role: 'user', parts: [{ text: `Câu hỏi người dùng: "Tổng dự toán quỹ cứu trợ bão lụt là bao nhiêu?"\n\nHãy quyết định truy vấn vào các Database nào.` }] }],
    system_instruction: {
      parts: [{text: `Bạn là Router Agent trong hệ thống Thủy lợi Bắc Ninh. Nhiệm vụ của bạn là bẻ lái câu lệnh của người dùng tới các Database thích hợp.\nCó 2 Database:\n1. RAG: Chứa kho báo cáo PCTT, báo cáo bão, các văn bản quy định, chữ nghĩa.\n2. SQL: Chứa số liệu kế toán, tiền bạc, quỹ giải ngân, danh sách máy bơm, tài sản cố định tĩnh.\nSử dụng function 'route_query' để trả về ['RAG'], ['SQL'], hoặc ['RAG', 'SQL'].`}]
    },
    tools: [{
      functionDeclarations: [{
        name: "route_query",
        description: "Lựa chọn đích đến truy vấn thích hợp",
        parameters: {
          type: "OBJECT",
          properties: {
            targets: {
              type: "ARRAY",
              items: { type: "STRING", enum: ["RAG", "SQL"] },
              description: "Danh sách database. Nhập 'RAG' nếu muốn văn bản, 'SQL' nếu cần tính toán số liệu tĩnh/tiền bạc/vật tư."
            }
          },
          required: ["targets"]
        }
      }]
    }],
    toolConfig: {
      functionCallingConfig: {
        mode: "ANY",
        allowedFunctionNames: ["route_query"]
      }
    }
  };

fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));
