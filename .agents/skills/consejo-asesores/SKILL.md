---
name: consejo-asesores
description: Revisa una propuesta (oferta, mensaje, experimento) desde varias perspectivas simuladas por IA, con un asesor que siempre contradice, y recoge los desacuerdos en la memoria del negocio. Use when la persona quiere una revisión crítica antes de decidir, pide "consejo de asesores" o quiere ver una propuesta desde otros puntos de vista.
---

# Consejo de asesores

Objetivo: ver los puntos débiles de una propuesta antes de decidir. Es una **revisión simulada por IA**: no sustituye a clientes, profesionales ni datos reales.

## Antes de empezar

Lee `MEMORIA.md`. Pregunta qué propuesta se revisa (oferta, mensaje, experimento, precio) y qué decisión depende de ella. Si no hay propuesta escrita, usa antes `aterrizar-idea` o `disenar-experimento`.

## Proceso

1. Abre con una línea: *"Revisión simulada por IA: cada perspectiva se construye a partir de lo que consta en la memoria del negocio, no de opiniones reales."*
2. Da la palabra a 4 perspectivas, 2–3 frases cada una, ancladas en datos de `MEMORIA.md`:
   - **Cliente:** ¿entiende qué es, lo necesita y por qué lo elegiría frente a su alternativa actual?
   - **Mensaje:** ¿se entiende en una frase, sin jerga y sin prometer de más?
   - **Captación:** ¿cómo llegaría a las personas adecuadas y qué señal observable daría en un circuito real del kit (formulario `/gracias`, `Consulta por WhatsApp`, `Reservas`, `Newsletter`, enlace Stripe o `/enlaces`)?
   - **Costes y operatividad:** ¿cabe en el límite de pérdida, en tiempo y dinero, y se puede ejecutar sin programar en `kit-negocio-web` (teniendo en cuenta sus límites reales: tienda Stripe de producto único sin carrito, Apps Script para volúmenes pequeños de reservas/WhatsApp, sin área privada)?
3. Añade un **asesor que contradice**: toma la conclusión a la que apuntan las demás y defiende la contraria con su mejor argumento, sin caricatura.
4. **Mapa de desacuerdos:** 2–3 conflictos reales entre perspectivas. Para cada uno: qué tensión hay y qué dato o experimento lo resolvería.
5. Cierra con una recomendación provisional, el riesgo principal y la siguiente acción. La decisión es de la persona.

## Reglas

- No inventes datos, cifras, testimonios ni opiniones de clientes o personas reales. Si falta un dato, dilo en la perspectiva que lo necesita.
- No uses nombres de personas famosas ni cites sus frases.
- Si todas las perspectivas coinciden, vuelve a pedir al asesor que contradice una objeción más fuerte.
- Cada afirmación nueva es **hipótesis** o **inferencia**, nunca evidencia: las perspectivas simuladas no aportan datos.
- Es para decidir dirección, no para redactar textos ni ejecutar.

## Salida

Actualiza `MEMORIA.md`:

- **Registro de conocimiento**: objeciones y riesgos como hipótesis o inferencias, con fuente "consejo simulado" y fecha.
- **Registro de trabajo**: datos que faltan para resolver cada desacuerdo.

Sugiere `disenar-experimento` para contrastar el desacuerdo más importante.
