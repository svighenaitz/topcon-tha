import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProfileCardSkeleton from '../ProfileCard/ProfileCardSkeleton';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { useProfileActions } from '../../hooks/useProfileActions';
import type { Profile, LikeDecision } from '../../types';

interface ProfileViewProps {
  current: Profile | null;
  isLoading: boolean;
  isOutOfProfiles: boolean;
  error: string | null;
  onDecide: (decision: LikeDecision, autoLoadNext?: boolean) => Promise<{ matched: boolean }>;
  onLoadNext: () => Promise<void>;
  onReload: () => Promise<void>;
}

export default function ProfileView({
  current,
  isLoading,
  isOutOfProfiles,
  error,
  onDecide,
  onLoadNext,
  onReload
}: ProfileViewProps) {
  const { isMatch, handleLike, handleDislike, handleOkay, resetMatch } = useProfileActions({
    onDecide,
    onLoadNext
  });

  // Reset match state when profile changes
  useEffect(() => {
    resetMatch();
  }, [current?.id, resetMatch]);

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={onReload} />;
  }

  if (isOutOfProfiles) {
    return (
      <Stack spacing={2} alignItems="center">
        <Typography>No more profiles. Check back later.</Typography>
        <Button variant="contained" onClick={onReload} aria-label="reload">
          Reload
        </Button>
      </Stack>
    );
  }

  if (!current) {
    return <ProfileCardSkeleton />;
  }

  return (
    <ProfileCard
      profile={current}
      onLike={handleLike}
      onDislike={handleDislike}
      isMatch={isMatch}
      onOkay={handleOkay}
    />
  );
}
