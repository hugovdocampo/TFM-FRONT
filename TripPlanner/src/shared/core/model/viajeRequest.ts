/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { PropuestaDto } from './propuestaDto';

export interface ViajeRequest {
  emailParticipantes?: string[];
  fechaFin?: string;
  fechaInicio?: string;
  propuestas?: PropuestaDto[];
  titulo?: string;
  userEmail?: string;
}
