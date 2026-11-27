---
name: interpretar-resultados
description: Organiza los datos de una prueba, separa observaciones de explicaciones posibles y propone continuar, modificar o detener con motivos, actualizando la memoria del negocio. Use when hay resultados de un experimento, hay que decidir el siguiente paso o actualizar el diagnóstico.
---

# Interpretar resultados

Objetivo: decidir con lo observado, sin sobreinterpretar pocos datos.

## Antes de empezar

Lee `MEMORIA.md` y la ficha del experimento: hipótesis, señal prevista y criterio fijado de antemano. Pide los datos reales disponibles en los canales del kit (`kit-negocio-web`) y en la hoja de seguimiento del alumno:
- Formularios recibidos en **Netlify → Forms** (recordando excluir cualquier envío de ensayo marcado como **`PRUEBA`**).
- Filas en Google Sheets (`Consultas` si usa `Consulta por WhatsApp`, `Reservas` + eventos en Google Calendar si usa `Reservas`).
- Suscripciones en **Brevo** (si usa `Newsletter`) o pagos en **Stripe** (si usa tienda).
- Tráfico, campañas UTM y visitas a `/gracias` en **Google Analytics 4** (solo si se activó en `Google, IA y buscadores` y los visitantes aceptaron cookies).

No inventes ni estimes datos que falten. Si hubo clics en WhatsApp sin registro de consulta recibida, sepáralos expresamente (`clic → consulta recibida → cita/venta`).

## Proceso

1. **Observaciones:** qué ocurrió, en cifras y hechos, sin adjetivos.
2. **Comparación** con lo que se definió como resultado favorable.
3. **Explicaciones posibles:** al menos dos, con qué dato ayudaría a distinguirlas.
4. **Fiabilidad:** cuántos datos hay y qué no se puede concluir con ellos.
5. **Revisión crítica:** evidencia a favor, evidencia en contra, explicaciones alternativas y el dato que falta para decidir. Distingue entusiasmo verbal de compromisos concretos, y comprueba si se cumplió el dato que debía contradecir la hipótesis.
6. **Decisión recomendada:** continuar, modificar o detener, con motivos y con el límite de gasto.
7. **Siguiente experimento:** la siguiente incertidumbre a reducir.

## Reglas

- Con pocos datos, di que **no hay información suficiente** y qué haría falta. Es una respuesta válida.
- Si el proyecto es ficticio o los datos son de ejemplo, indícalo en cada conclusión.
- No expliques un resultado con una causa que no se haya observado: es una hipótesis.
- La decisión final (precio, compromisos con clientes, gasto) es de la persona.

## Salida

Actualiza `MEMORIA.md`:

- **Resultados y decisiones** con fecha.
- **Registro de conocimiento**: evidencias nuevas e hipótesis revisadas, cada una con su tipo (declarado, evidencia, inferencia o hipótesis) y si está verificada.
- **Registro de trabajo** con las próximas acciones.

Si hay que probar otra cosa, sugiere `disenar-experimento`. Si los datos muestran tráfico hacia la web pero pocas consultas o compras, sugiere diagnosticar fugas con `landing-page-conversion-audit` o `auditar-web-seo`.
