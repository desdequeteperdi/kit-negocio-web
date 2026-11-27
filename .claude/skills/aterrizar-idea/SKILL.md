---
name: aterrizar-idea
description: Convierte una idea de negocio en una oferta concreta, con recursos, límites e hipótesis por contrastar, y la registra en la memoria del negocio. Use when la persona emprendedora describe una idea, quiere empezar un proyecto o dice "aterriza mi idea".
---

# Aterrizar la idea

Objetivo: pasar de una idea a una oferta clara y a una lista de hipótesis, sin rellenar planes ni cuadrantes.

## Antes de empezar

Lee `MEMORIA.md` (si no existe, créalo desde `plantillas/memoria-negocio.md`). No repitas preguntas ya respondidas.

## Proceso

1. Pregunta **una cosa cada vez**. Para cada pregunta, propón tu mejor borrador de respuesta y pide que lo corrija.
2. Cubre solo lo necesario:
   - Qué se vende y a quién.
   - Qué problema resuelve y cómo lo resuelve hoy el cliente: pregunta qué sabe sobre la **última ocasión** en que un cliente tuvo ese problema y qué hizo (alternativa actual, incluida "no hacer nada"). Registra la procedencia: conversación documentada, observación directa o interpretación de la persona emprendedora. Si no lo sabe, déjalo pendiente para las conversaciones con clientes; no reconstruyas una experiencia ficticia.
   - Diferencia propuesta: "¿Qué crees que ofrece tu propuesta de forma distinta a las alternativas que utiliza hoy el cliente? Indica frente a qué alternativa y en qué consiste". Si todavía no identifica ninguna, regístralo como pendiente.
   - Recursos: tiempo, dinero, contactos, equipo.
   - Límite de pérdida: cuánto tiempo y dinero se puede perder sin problema.
   - Si es un proyecto real o un caso ficticio.
3. Para cuando tengas lo suficiente para escribir el brief. Máximo 8 preguntas.

## Reglas

- No inventes datos del negocio, cifras ni testimonios. Si falta un dato, pregúntalo o regístralo como pendiente.
- Distingue **declarado** (lo que la persona afirma sobre su propio negocio, p. ej. "dispongo de 5 horas a la semana"), **evidencia** (observación documentada), **inferencia** e **hipótesis** de mercado (p. ej. "mis clientes pagarían 200 €"). Registra la procedencia y si se ha verificado.
- No des por demostrada la demanda.
- No inventes una diferencia ni la fuerces para cerrar el brief. Si no se identifica ninguna, regístrala como pendiente y continúa con una oferta concreta y honesta.
- Separa dos afirmaciones distintas: que la propuesta **tenga** una característica ("atiendo los sábados": declarada) y que esa característica **importe** al cliente al elegir ("me elegirán por atender los sábados": hipótesis). Registra la procedencia de cada una y qué falta por comprobar.

## Salida

Actualiza `MEMORIA.md`:

- Sección **Negocio** completa, incluida la **oferta en una frase**, la **alternativa actual** del cliente y la tabla de **diferencia propuesta**.
- **Registro de conocimiento**: cada afirmación con su tipo (declarado, evidencia, inferencia o hipótesis) y si está verificada.
- **Registro de trabajo**: lo que falta por averiguar, con responsable y fecha o condición.

Termina con:
1. Un brief de 5 líneas (la primera, la oferta en una frase) y las 3 hipótesis más arriesgadas, ordenadas por lo poco que se sabe de ellas y lo mucho que importan.
2. Cómo encaja la prueba inicial en `kit-negocio-web` **sin programar desde Sanity Studio**: por ejemplo, oferta principal en `1. Mi negocio y portada → Portada` + `Servicios` (o una `Landing de campaña` en `/[slug]`), y captación por formulario (`Contacto`), `Consulta por WhatsApp`, `Reservas con Google Calendar` o `Catálogo` (con enlace de pago Stripe opcional).
3. Sugerencia de continuar con `investigar-mercado`.
