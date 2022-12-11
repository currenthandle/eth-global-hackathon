import { useEffect, useState } from 'react';

export default function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
  delegated?: any;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  console.log('children', children);
  console.log('delegated', delegated);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
