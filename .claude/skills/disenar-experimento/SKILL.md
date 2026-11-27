---
name: disenar-experimento
description: Elige una hipótesis y diseña una prueba pequeña con señal observable, plazo, presupuesto máximo y criterio para continuar, modificar o detener. Use when hay que decidir qué probar, preparar una acción de captación o rellenar la ficha de experimento.
---

# Diseñar el siguiente experimento

Objetivo: probar lo mínimo necesario para aprender algo útil sobre una oportunidad, antes de construir o invertir más.

## Antes de empezar

Lee `MEMORIA.md`: hipótesis, recursos, límite de pérdida y resultados previos. Si no hay hipótesis, usa antes `aterrizar-idea`.

## Proceso

1. Elige **una** hipótesis: la que más importa, menos se sabe y se puede comprobar con menos coste. Explica por qué.
2. Propón 2–3 formas de probarla y recomienda una. Ejemplos: página con oferta y contacto, mensaje directo a un grupo pequeño, conversaciones con clientes potenciales, preventa o lista de espera.
3. Define la ficha (ver `plantillas/memoria-negocio.md`, sección Experimentos):
   - Hipótesis, oferta y acción.
   - **Señal observable** (solicitudes, reservas, respuestas, motivos de rechazo).
   - Qué cuenta como resultado favorable, fijado **antes** de empezar.
   - **Qué dato contradiría la hipótesis**, también fijado antes.
   - **Si no hay respuestas:** qué no se puede concluir (cero contactos puede ser "no interesa" o "no ha llegado a nadie"; pide el dato de exposición: a cuántas personas llegó).
   - Plazo y presupuesto máximo, dentro del límite de pérdida.
   - Qué hacer si sale bien, regular o mal: continuar, modificar o detener.
4. Indica qué preparar en `kit-negocio-web` **sin programar** y qué se puede dejar fuera:
   - **Landing de campaña sin tocar el menú:** `1. Mi negocio y portada → Páginas y landings de campaña → + → Landing de campaña` (`/[slug]`, con `mostrarEnMenu` desactivado, `mostrarContacto` activo y `noindex` opcional si es una prueba temporal).
   - **Captación o prueba comercial según la señal elegida:**
     - Solicitudes de presupuesto: `4. Contacto, buscadores y legal → Contacto` (lleva a `/gracias`, registra origen en Netlify Forms).
     - Consultas rápidas por mensajería: `4. Contacto… → Consulta por WhatsApp` (abre WhatsApp y guarda fila en Google Sheets).
     - Citas con día/hora y precio orientativo: `4. Contacto… → Reservas con Google Calendar`.
     - Lista de espera / recurso por correo: `4. Contacto… → Newsletter` (Brevo).
     - Preventa o pago directo de 1 producto/servicio: `3. Catálogo y tienda` (activar `tienda` en `Catálogo: ajustes` y pegar enlace de Stripe `https://buy.stripe.com...` en `Productos`).
     - Tráfico desde bio de redes: `1. Mi negocio y portada → Página /enlaces (Link in bio)` (`/enlaces`).
   - Si el experimento requiere cambios de diseño fijo o campos nuevos fuera de Sanity Studio, anótalo como pendiente en `MEMORIA.md` (requiere código en `web/src/` o `studio/schemas/index.ts` siguiendo `AGENTS.md`) o simplifica la prueba al alcance actual del kit.

## Reglas

- Un MVP no valida por sí mismo una idea: debe permitir observar una señal. Una web sin exposición a clientes sigue siendo una hipótesis.
- La inversión publicitaria no es obligatoria. Prefiere la prueba más barata que dé información.
- **Decisión humana:** publicar en Sanity/Netlify, activar módulos con Apps Script/Stripe/Brevo, enviar mensajes y gastar dinero los autoriza la persona, no la skill. Marca en la ficha qué requiere su autorización.
- Prefiere señales de **compromiso** (reserva, depósito, cita, presentación a otra persona) a señales de entusiasmo ("me gusta", "suena bien").
- No prometas resultados ni fijes cifras que no se apoyen en datos.

## Salida

Añade la ficha en **Experimentos** de `MEMORIA.md` y las tareas en **Registro de trabajo**. Sugiere construir en Sanity Studio solo lo que esa prueba necesita (y usa `redactar-landing` si toca redactar los textos).
