import { Request, Response, NextFunction } from 'express';

async function delay(ms: number): Promise<void> {
  await new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, ms);
  });
}

export async function logger(req: Request, _: Response, next: NextFunction) {
  console.log(`request ${req.url} is processing`);

  // TODO: fake delay
  await delay(600);

  next();
}
