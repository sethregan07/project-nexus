import { Button, Typography, Box, Card, CardContent } from '@mui/joy';
import { IconHome, IconUser, IconSettings, IconStar } from '@tabler/icons-react';

export default function Home() {
  return (
    <Box className="min-h-screen bg-gray-50 p-8">
      <Box className="max-w-4xl mx-auto">
        <Typography level="h1" className="mb-8 text-center">
          Welcome to Project Nexus
        </Typography>
        <Typography level="body-lg" className="mb-8 text-center text-gray-600">
          A Next.js project featuring Tailwind CSS, Joy UI components, and Tabler icons.
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="outlined">
            <CardContent>
              <IconHome className="w-8 h-8 mb-2 text-blue-500" />
              <Typography level="h3">Home</Typography>
              <Typography level="body-sm">Main dashboard</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <IconUser className="w-8 h-8 mb-2 text-green-500" />
              <Typography level="h3">Profile</Typography>
              <Typography level="body-sm">User settings</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <IconSettings className="w-8 h-8 mb-2 text-orange-500" />
              <Typography level="h3">Settings</Typography>
              <Typography level="body-sm">Configuration</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <IconStar className="w-8 h-8 mb-2 text-yellow-500" />
              <Typography level="h3">Favorites</Typography>
              <Typography level="body-sm">Saved items</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box className="flex gap-4 justify-center flex-wrap">
          <Button variant="solid" color="primary">
            Primary Button
          </Button>
          <Button variant="outlined" color="neutral">
            Outlined Button
          </Button>
          <Button variant="soft" color="success">
            Soft Button
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
