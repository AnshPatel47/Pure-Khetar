'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Field, inputClass } from './Field';
import { Button } from '@/components/ui/Button';
import { DELIVERY_CITIES, VISNAGAR_VILLAGES } from '@/data/checkout';
import { shippingSchema } from '@/lib/validations/checkout.schema';

export interface AddressForm {
  name: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  village: string;
  customVillage: string;
  pincode: string;
  landmark: string;
}

interface AddressStepProps {
  value: AddressForm;
  onChange: (value: AddressForm) => void;
  onNext: () => void;
}

export function AddressStep({ value, onChange, onNext }: AddressStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  const set = (key: keyof AddressForm) => (event: { target: { value: string } }) => {
    onChange({ ...value, [key]: event.target.value });
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  // Same schema the server uses, so the messages match what the server would say.
  const handleNext = () => {
    const deliveryValue = {
      ...value,
      village: value.village === 'Other village' ? value.customVillage : value.village,
    };
    const result = shippingSchema.safeParse(deliveryValue);
    if (result.success) {
      onChange(deliveryValue);
      return onNext();
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]])));
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name *" error={errors.name}>
          <input className={inputClass} autoComplete="name" placeholder="Ramesh Patel" value={value.name} onChange={set('name')} />
        </Field>
        <Field label="Mobile number *" error={errors.phone}>
          <input className={inputClass} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={value.phone} onChange={set('phone')} />
        </Field>
      </div>

      <Field label="House / flat / building *" error={errors.address}>
        <input className={inputClass} autoComplete="address-line1" placeholder="B-204, Shanti Heights" value={value.address} onChange={set('address')} />
      </Field>

      <Field label="Area / street *" error={errors.area}>
        <input className={inputClass} autoComplete="address-line2" placeholder="Satellite Road, near Jodhpur Circle" value={value.area} onChange={set('area')} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Taluka / City" error={errors.city}>
          <select className={inputClass} value={value.city} onChange={set('city')}>
            {DELIVERY_CITIES.map((city) => <option key={city}>{city}</option>)}
          </select>
        </Field>
        <Field label="Village *" error={errors.village}>
          <select className={inputClass} value={value.village} onChange={set('village')}>
            <option value="">Select village</option>
            {VISNAGAR_VILLAGES.map((village) => <option key={village} value={village}>{village}</option>)}
          </select>
        </Field>
        <Field label="Pincode *" error={errors.pincode}>
          <input className={inputClass} inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="384315" value={value.pincode} onChange={set('pincode')} />
        </Field>
      </div>

      {value.village === 'Other village' && (
        <Field label="Village name *" error={errors.village}>
          <input className={inputClass} value={value.customVillage} onChange={(event) => onChange({ ...value, customVillage: event.target.value })} placeholder="Enter village name" />
        </Field>
      )}

      <Field label="State">
        <input className={inputClass} value="Gujarat" readOnly />
      </Field>

      <Field label="Landmark (optional)">
        <input className={inputClass} placeholder="Near ISKCON temple" value={value.landmark} onChange={set('landmark')} />
      </Field>

      <Button size="lg" fullWidth onClick={handleNext} rightIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>
        Continue to time slot
      </Button>
    </div>
  );
}
