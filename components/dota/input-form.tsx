'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PlayerForm } from './player';

export function InputForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add</CardTitle>
      </CardHeader>
      <CardContent>
        <PlayerForm />
      </CardContent>
    </Card>
  );
}
