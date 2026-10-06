'use client';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ChangeEvent, FormEvent } from 'react';
import SendRounded from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { services } from '../../content/services';
import { site } from '../../content/site';
import SurfaceCard from '../ui/SurfaceCard';

const interests = services.map((service) => service.title);
type FieldName = 'name' | 'email' | 'company' | 'message';
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = { name: '', email: '', company: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 20)
    errors.message = 'Please share a little more (at least 20 characters).';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    const { value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const toggleInterest = (interest: string) =>
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstInvalid) {
      (event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      setStatus('Please fix the highlighted fields.');
      return;
    }

    const subject = `Project enquiry from ${values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.company.trim() && `Company: ${values.company.trim()}`,
      selected.length > 0 && `Interested in: ${selected.join(', ')}`,
      '',
      values.message.trim(),
    ]
      .filter((line) => line !== false && line !== '')
      .join('\n');

    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Opening your email app with the message ready to send.');
  };

  const field = (name: FieldName, props: TextFieldProps) => ({
    ...props,
    name,
    value: values[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name] ?? props.helperText,
    fullWidth: true,
  });

  return (
    <SurfaceCard
      component="form"
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
    >
      <Typography id="contact-form-title" variant="h3" sx={{ fontSize: '1.5rem' }}>
        Tell us about your project
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        A few details are enough to get started.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          mt: 3.5,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        }}
      >
        <TextField
          {...field('name', { label: 'Your name', required: true, autoComplete: 'name' })}
        />
        <TextField
          {...field('email', {
            label: 'Email',
            type: 'email',
            required: true,
            autoComplete: 'email',
          })}
        />
        <TextField
          {...field('company', {
            label: 'Company or website',
            autoComplete: 'organization',
            helperText: 'Optional',
          })}
          sx={{ gridColumn: '1 / -1' }}
        />
      </Box>

      <Box component="fieldset" sx={{ border: 0, p: 0, m: 0, mt: 3 }}>
        <Typography component="legend" variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
          What do you need?{' '}
          <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            (optional)
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {interests.map((interest) => {
            const active = selected.includes(interest);
            return (
              <Chip
                key={interest}
                component="button"
                type="button"
                label={interest}
                aria-pressed={active}
                onClick={() => toggleInterest(interest)}
                color={active ? 'primary' : 'default'}
                variant={active ? 'filled' : 'outlined'}
                sx={[
                  { cursor: 'pointer', fontFamily: 'inherit' },
                  active && {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                ]}
              />
            );
          })}
        </Box>
      </Box>

      <TextField
        {...field('message', {
          label: 'Project details',
          required: true,
          multiline: true,
          minRows: 5,
          helperText: 'Goals, timeline, current setup — whatever helps.',
        })}
        sx={{ mt: 3 }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mt: 3 }}>
        <Button type="submit" variant="contained" size="large" endIcon={<SendRounded />}>
          Send enquiry
        </Button>
        <Typography variant="body2" color="text.secondary" role="status" aria-live="polite">
          {status || site.responseTime}
        </Typography>
      </Box>
    </SurfaceCard>
  );
}
