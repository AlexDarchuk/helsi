import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ProfileContext } from '../../../context/ProfileContext';

interface StatItem {
  labelId: string;
  value: number;
  suffix: string;
}

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === 0) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, active]);

  return count;
}

interface StatCardProps {
  labelId: string;
  value: number;
  suffix: string;
  active: boolean;
}

const StatCard: FC<StatCardProps> = ({ labelId, value, suffix, active }) => {
  const count = useCountUp(value, 1500, active);

  return (
    <Box textAlign="center" px={2}>
      <Typography
        variant="h2"
        fontWeight={800}
        color="white"
        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1 }}
      >
        {count.toLocaleString()}
        {suffix}
      </Typography>
      <Typography variant="h6" color="rgba(255,255,255,0.8)" mt={0.5}>
        <FormattedMessage id={labelId} defaultMessage={labelId} />
      </Typography>
    </Box>
  );
};

const StatsSection: FC = () => {
  const { doctorsList, patientsList } = useContext(ProfileContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  const stats: StatItem[] = [
    { labelId: 'stats-doctors', value: doctorsList.length, suffix: '+' },
    { labelId: 'stats-patients', value: patientsList.length, suffix: '+' },
    { labelId: 'stats-consultations', value: 10000, suffix: '+' },
    { labelId: 'stats-cities', value: 25, suffix: '+' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimating(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: 'linear-gradient(135deg, #0d7a45 0%, #1a9e5c 100%)',
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 4, md: 2 }}>
        {stats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.labelId}>
            <StatCard
              labelId={stat.labelId}
              value={stat.value}
              suffix={stat.suffix}
              active={animating}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
