import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const projects = JSON.parse(fileContents);
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const projects = JSON.parse(fileContents);
    
    projects.push(newProject);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
    return NextResponse.json({ message: 'Project saved successfully', projects }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    let title = null;
    const { searchParams } = new URL(request.url);
    title = searchParams.get('title');

    if (!title) {
      try {
        const body = await request.json();
        title = body.title;
      } catch (e) {
        // ignore JSON parse error if body is empty
      }
    }

    if (!title) {
      return NextResponse.json({ error: 'Title parameter is required' }, { status: 400 });
    }

    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let projects = JSON.parse(fileContents);
    
    const targetTitle = title.trim();
    const initialCount = projects.length;
    projects = projects.filter(p => p.title.trim() !== targetTitle);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
    return NextResponse.json({ 
      message: 'Project deleted successfully',
      deletedCount: initialCount - projects.length,
      projects 
    });
  } catch (error) {
    console.error("DELETE projects error:", error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { originalTitle, updatedProject } = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let projects = JSON.parse(fileContents);
    
    const index = projects.findIndex(p => p.title.trim() === originalTitle.trim());
    if (index !== -1) {
      projects[index] = updatedProject;
      fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
      return NextResponse.json({ message: 'Project updated successfully', projects });
    }
    
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
