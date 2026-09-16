import { useFormContext } from 'react-hook-form';
import { useRegisterContext } from '../lib/context/register.context';
import { RegisterFormValue } from '../lib/type/register';

interface IHeaderProps {
  title?: string;
  description?: string;
  info?: string;
}

export default function RegisterHeader({ title, description, info }: IHeaderProps) {
  // Register Context
  const { step, setStep } = useRegisterContext();

  const { resetField } = useFormContext<RegisterFormValue>();

  function editEmail() {
    setStep(1);
    resetField('code');
  }
  return (
    <div className="mt-9 mb-6 pb-4 border-b border-b-ds-border-muted">
      <h2 className="font-bold text-3xl text-ds-text-plain mb-4">{title}</h2>
      <h3 className="font-semibold text-xl text-ds-text-primary mb-1">{description}</h3>
      <h4 className="font-normal text-base text-ds-text-plain">
        {info}

        {step === 2 && (
          <button
            type="button"
            className="font-medium text-base text-blue-700 underline ms-1 cursor-pointer"
            onClick={editEmail}
          >
            Edit
          </button>
        )}
      </h4>
    </div>
  );
}
