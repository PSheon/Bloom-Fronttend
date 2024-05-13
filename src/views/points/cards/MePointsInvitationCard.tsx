// ** MUI Imports
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const MePointsInvitationCard = () => {
  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent>
        <Stack spacing={2.7} justifyContent='center'>
          <Box>
            <Typography variant='subtitle2'>邀請連結</Typography>
          </Box>
          <Box>
            <Divider />
          </Box>
          <Stack>
            <InputLabel
              htmlFor='refer-code'
              sx={{
                mb: 2,
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                display: 'inline-flex',
                whiteSpace: 'break-spaces'
              }}
            >
              <Typography component='span' color='text.secondary'>
                邀請碼
              </Typography>
            </InputLabel>
            <Stack direction='row' spacing={4} alignItems='center'>
              <TextField fullWidth size='small' id='refer-code' placeholder='xxx-xxx' />
              <Button variant='contained'>Copy</Button>
            </Stack>
          </Stack>
          <Stack>
            <InputLabel
              htmlFor='refer-link'
              sx={{
                mb: 2,
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                display: 'inline-flex',
                whiteSpace: 'break-spaces'
              }}
            >
              <Typography component='span' color='text.secondary'>
                邀請連結
              </Typography>
            </InputLabel>
            <Stack direction='row' spacing={4} alignItems='center'>
              <TextField fullWidth size='small' id='refer-link' placeholder='xxx-xxx' />
              <Button variant='contained'>Copy</Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MePointsInvitationCard
