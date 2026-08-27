import * as z from 'zod'

export const structureTypes = [
  'Résidence seniors',
  'Résidence étudiante',
  'Co-living',
  'Habitat inclusif',
  'Foyer jeunes travailleurs',
  'Copropriété',
  'Autre'
] as const

export const testDurations = ['3 mois', '6 mois', '12 mois'] as const

export const contactRequestSchema = z.object({
  firstName: z.string().trim().min(1, 'Indiquez votre prénom'),
  lastName: z.string().trim().min(1, 'Indiquez votre nom'),
  email: z.string().trim().pipe(z.email('Cet email ne semble pas valide')),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || value.replace(/\D/g, '').length >= 8,
      'Indiquez un numéro plus complet'
    ),
  structureType: z
    .string()
    .refine(
      (value): value is (typeof structureTypes)[number] =>
        (structureTypes as readonly string[]).includes(value),
      'Choisissez un type de résidence'
    ),
  testDuration: z.enum(testDurations).default('3 mois'),
  message: z.string().max(180, '180 caractères maximum').default('')
})

export type ContactRequest = z.infer<typeof contactRequestSchema>
export type ContactRequestForm = z.input<typeof contactRequestSchema>
