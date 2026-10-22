import TextField from '../../components/ui/TextField'
import SelectField from '../../components/ui/SelectField'
import Button from '../../components/ui/Button'
import { parseEuroToCents } from '../../utils/money'
import { useState, useRef, useEffect } from 'react'

type AccountFormProps = {
  onCancel: () => void
}

type AccountFormErrors = {
  name?: string
  accountType?: string
  openingBalance?: string
}

/**
 * Prépare localement la saisie d’un compte, sans sauvegarde des données.
 * @param props - Fonction onCancel appelée lorsque l’annulation est acceptée.
 * @returns Les champs du compte et les boutons de vérification et d’annulation.
 */
export default function AccountForm({ onCancel }: Readonly<AccountFormProps>) {
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState('')
  const [openingBalance, setOpeningBalance] = useState('')
  const [errors, setErrors] = useState<AccountFormErrors>({})
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return
    }
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus()
  }, [errors])

  useEffect(() => {
    formRef.current
      ?.querySelector<HTMLInputElement>('input[name="name"]')
      ?.focus()
  }, [])

  const hasChanges = name !== '' || accountType !== '' || openingBalance !== ''

  /**
   * Vérifie les champs et actualise les erreurs et la confirmation locale.
   * @returns Rien ; aucune donnée n’est enregistrée.
   */
  function handleValidate() {
    const nextErrors: AccountFormErrors = {}

    if (name.trim() === '') {
      nextErrors.name = 'Saisissez un nom de compte.'
    }

    if (!['checking', 'savings', 'cash'].includes(accountType)) {
      nextErrors.accountType = 'Sélectionnez un type de compte.'
    }

    const openingBalanceCents = parseEuroToCents(openingBalance)

    if (openingBalanceCents === null) {
      nextErrors.openingBalance =
        'Saisissez un montant valide avec deux décimales maximum.'
    }

    setErrors(nextErrors)
    setIsVerified(Object.keys(nextErrors).length === 0)
  }

  /**
   * Demande confirmation si la saisie a changé, puis appelle onCancel.
   * @returns Rien ; conserve le formulaire si l’abandon est refusé.
   */
  function handleCancel() {
    if (
      hasChanges &&
      !window.confirm('Abandonner les informations saisies ?')
    ) {
      return
    }
    onCancel()
  }
  return (
    <form
      className="account-form"
      aria-labelledby="account-form-title"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        handleValidate()
      }}
      ref={formRef}
    >
      <h3 id="account-form-title">Ajouter un compte</h3>
      <p>Préparation locale: aucune donnée ne sera enregistrée.</p>

      <TextField
        label="Nom du compte"
        name="name"
        required
        autoComplete="off"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setIsVerified(false)
        }}
        error={errors.name}
      />
      <SelectField
        label="Type de compte"
        name="accountType"
        required
        value={accountType}
        onChange={(e) => {
          setAccountType(e.target.value)
          setIsVerified(false)
        }}
        error={errors.accountType}
      >
        <option value="" disabled>
          Sélectionner un type
        </option>
        <option value="checking">Compte courant</option>
        <option value="savings">Épargne</option>
        <option value="cash">Espèces</option>
      </SelectField>
      <TextField
        label="Solde initial en euros"
        name="openingBalance"
        inputMode="decimal"
        hint="Montant positif, nul ou négatif, avec deux décimales maximum."
        required
        value={openingBalance}
        onChange={(e) => {
          setOpeningBalance(e.target.value)
          setIsVerified(false)
        }}
        error={errors.openingBalance}
      />
      {isVerified && (
        <output>
          Informations vérifiées localement. Aucun compte n'a été enregistré.
        </output>
      )}
      <Button type="submit">Vérifier les informations</Button>
      <Button onClick={handleCancel}>Annuler</Button>
    </form>
  )
}
