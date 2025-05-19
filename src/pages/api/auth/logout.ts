
// API route handler for logout

// This function handles the POST request to /api/auth/logout
export async function POST(req: Request) {
  try {
    // Clear token cookie
    const cookieHeader = `token=; HttpOnly; Path=/; Max-Age=0`;

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
