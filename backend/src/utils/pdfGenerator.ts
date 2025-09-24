import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

function getValue(obj: any, pathStr: string) {
  return pathStr.split(".").reduce((acc, key) => acc?.[key], obj);
}

export const generatePDF = async (data: any, assessment: any) => {
  let html = `<h1>${assessment.name}</h1>`;
  assessment.sections.forEach((section: any) => {
    html += `<h2>${section.title}</h2><ul>`;
    section.fields.forEach((field: string) => {
      const value = getValue(data, field) || "N/A";
      html += `<li><b>${field}:</b> ${value}</li>`;
    });
    html += "</ul>";
  });

  const filePath = path.join("reports", `${data.session_id}.pdf`);
  if (!fs.existsSync("reports")) fs.mkdirSync("reports");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return filePath;
};
