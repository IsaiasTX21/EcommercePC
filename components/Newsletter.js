import { site } from "@/site.config";

export default function Newsletter() {
  const n = site.newsletter;
  if (!n?.action) return null;
  return (
    <section className="news">
      <form className="wrap-x news-in" action={n.action} method="post" target="_blank">
        <strong>{site.name} News <span>Receba ofertas</span></strong>
        <input type="text" name={n.nameField} placeholder="Digite seu nome" aria-label="Seu nome" />
        <input type="email" name={n.emailField} placeholder="Digite seu e-mail" aria-label="Seu e-mail" required />
        <button type="submit" className="btn-accent">CADASTRAR</button>
      </form>
    </section>
  );
}
