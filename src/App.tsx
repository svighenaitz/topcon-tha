import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useProfiles } from './hooks/useProfiles';
import ProfileView from './components/ProfileView/ProfileView';

function App() {
  const { current, isLoading, isOutOfProfiles, error, decide, reload, loadNext } = useProfiles();

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
        <ProfileView
          current={current}
          isLoading={isLoading}
          isOutOfProfiles={isOutOfProfiles}
          error={error}
          onDecide={decide}
          onLoadNext={loadNext}
          onReload={reload}
        />
      </Stack>
    </Container>
  );
}

export default App;
