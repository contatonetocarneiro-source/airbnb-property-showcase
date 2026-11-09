CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  property_slug text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  message text,
  language text NOT NULL DEFAULT 'en',
  nights integer,
  estimated_total_eur numeric(10,2),
  status text NOT NULL DEFAULT 'new'
);

GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX booking_requests_created_at_idx ON public.booking_requests (created_at DESC);