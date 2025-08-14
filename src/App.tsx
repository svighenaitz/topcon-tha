import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard/ProfileCard';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import { useProfiles } from './hooks/useProfiles';

function App() {
  const { current, isLoading, isOutOfProfiles, error, decide, reload, loadNext } = useProfiles();
  const [isMatch, setIsMatch] = useState(false);

  // Reset match state when profile changes
  useEffect(() => {
    setIsMatch(false);
  }, [current?.id]);

  const handleDecision = async (decision: 'like' | 'dislike') => {
    const res = await decide(decision, false); // Don't auto-load next profile
    if (res.matched) {
      setIsMatch(true);
      // Don't automatically proceed to next profile on match
    } else {
      // Only load next profile if there's no match
      await loadNext();
    }
  };

  const handleOkay = async () => {
    // Only proceed to next profile when Okay is clicked
    if (isMatch) {
      setIsMatch(false);
      await loadNext();
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: 4, 
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: '100%' }}>
        <Typography variant="h4" component="h1">Tinder-like</Typography>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} onRetry={() => { void reload(); }} />}
        {!isLoading && !error && current && (
          <ProfileCard
            profile={current}
            onLike={() => { void handleDecision('like'); }}
            onDislike={() => { void handleDecision('dislike'); }}
            isMatch={isMatch}
            onOkay={handleOkay}
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
      </Stack>
    </Container>
  );
}

export default App
