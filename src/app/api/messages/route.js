import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'messages.json');

// Ensure the data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf8');
  }
}

// Safely read and parse the messages file
function readMessages() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFilePath, 'utf8').trim();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // File was corrupted — reset it
    fs.writeFileSync(dataFilePath, '[]', 'utf8');
    return [];
  }
}

export async function GET() {
  try {
    const messages = readMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('[GET /api/messages] Error:', error);
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newMessage = await request.json();

    if (!newMessage.name || !newMessage.email || !newMessage.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Add metadata
    newMessage.id = Date.now().toString();
    newMessage.date = new Date().toISOString();
    newMessage.status = 'unread';

    const messages = readMessages();

    // Prepend new message
    messages.unshift(newMessage);

    fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');
    return NextResponse.json({ message: 'Message sent successfully', id: newMessage.id }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/messages] Error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    const messages = readMessages();
    
    const msgIndex = messages.findIndex(m => m.id === id);
    if (msgIndex !== -1) {
      messages[msgIndex].status = status;
      fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');
      return NextResponse.json({ message: 'Message status updated' });
    }
    
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    console.error('[PATCH /api/messages] Error:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request) {
  console.log('[DELETE /api/messages] Handler started. URL:', request.url);
  try {
    const { searchParams } = new URL(request.url, 'http://localhost');
    const id = searchParams.get('id');

    console.log('[DELETE /api/messages] Parsed ID:', id);

    if (!id) {
      console.error('[DELETE /api/messages] Error: No ID provided in query string');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let messages = readMessages();
    const initialLength = messages.length;
    
    // Filter out the message with the matching ID
    messages = messages.filter(m => String(m.id).trim() !== String(id).trim());
    
    if (messages.length === initialLength) {
      console.error(`[DELETE /api/messages] Error: Message with ID ${id} not found. Available IDs:`, messages.map(m => m.id));
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');
    console.log(`[DELETE /api/messages] Successfully deleted message ${id}.`);
    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/messages] Unexpected Server Error:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
