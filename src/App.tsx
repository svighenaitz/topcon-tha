import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ProfileCard from './components/ProfileCard/ProfileCard';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import MatchModal from './components/MatchModal/MatchModal';
import { useProfiles } from './hooks/useProfiles';

function App() {
  const { current, isLoading, isOutOfProfiles, error, decide, reload } = useProfiles();
  const [isMatchOpen, setIsMatchOpen] = useState(false);

  const handleDecision = async (decision: 'like' | 'dislike') => {
    const res = await decide(decision);
    if (res.matched) {
      setIsMatchOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h1">Tinder-like</Typography>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} onRetry={() => { void reload(); }} />}
        {!isLoading && !error && current && (
          <ProfileCard
            profile={current}
            onLike={() => { void handleDecision('like'); }}
            onDislike={() => { void handleDecision('dislike'); }}
          />
        )}
        {!isLoading && !error && isOutOfProfiles && (
          <Stack spacing={2} alignItems="center">
            <Typography>No more profiles. Check back later.</Typography>
            <Button variant="contained" onClick={() => { void reload(); }} aria-label="reload">
              Reload
            </Button>
          </Stack>
        )}
        <MatchModal open={isMatchOpen} onClose={() => { setIsMatchOpen(false); }} />
      </Stack>
    </Container>
  );
}

export default App
