import { frequentlyAskedQuestions } from "../data/content";
import { catalogueDownload } from "../lib/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function Faq() {
  return <section className="faq-section content-width" aria-labelledby="faq-heading">
    <div><p className="eyebrow">A FEW THINGS TO KNOW</p><h2 id="faq-heading">Your questions.<br />A starting point.</h2>
      <a className="text-link" href={catalogueDownload.href} download={catalogueDownload.filename}>English catalogue <ArrowUpRight size={18} /></a>
    </div>
    <div>{frequentlyAskedQuestions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}
