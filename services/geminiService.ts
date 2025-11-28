import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (history: string[], message: string): Promise<string> => {
  try {
    const prompt = `
      Bạn là trợ lý ảo AI cho một website freelance thiết kế web tên là "CreativeFlow".
      Phong cách của bạn: Thân thiện, chuyên nghiệp, súc tích và sáng tạo.
      Dịch vụ của chúng tôi: Thiết kế UI/UX, Lập trình Frontend (React, Vue), 3D Web (Three.js), và Branding.
      
      Dưới đây là danh sách các dự án nổi bật mà chúng tôi đã thực hiện, hãy nhắc đến chúng nếu phù hợp:
      1. Heona Media (https://heonamedia.vercel.app/) - Agency truyền thông, phong cách sáng tạo.
      2. Neon Glide Patin (https://neon-glide-patin.vercel.app/) - Shop bán đồ thể thao, patin.
      3. Emerald Estate (https://emerald-estate.vercel.app/) - Trang web bất động sản cao cấp.
      4. Sen Mộc Spa (https://senmocspa.vercel.app/) - Spa & Wellness, phong cách thư giãn.
      5. Minh An Studio (https://minh-an-studio.vercel.app/) - Portfolio nhiếp ảnh nghệ thuật.
      6. Nha Khoa T-M-C (https://nha-khoa-t-m-c.vercel.app/) - Phòng khám nha khoa uy tín.

      Hãy trả lời câu hỏi của khách hàng dựa trên ngữ cảnh này.
      Nếu khách hàng muốn đặt dịch vụ, hãy hướng dẫn họ điền vào form liên hệ ở cuối trang.
      
      Lịch sử chat:
      ${history.join('\n')}
      
      Khách hàng: ${message}
      Trợ lý:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.";
  }
};