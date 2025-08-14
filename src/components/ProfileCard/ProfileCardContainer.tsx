import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

interface ProfileCardContainerProps {
  children: ReactNode;
  mediaContent: ReactNode;
  actionsContent: ReactNode;
  ariaLabel?: string;
}

export default function ProfileCardContainer({ 
  children, 
  mediaContent, 
  actionsContent, 
  ariaLabel = "profile-card" 
}: ProfileCardContainerProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card sx={{ maxWidth: 420 }} aria-label={ariaLabel}>
        <CardMedia
          component="div"
          sx={{ width: '420px', height: '520px' }}
        >
          {mediaContent}
        </CardMedia>
        <CardContent>
          {children}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
            {actionsContent}
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}
