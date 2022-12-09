import { NextApiRequest, NextApiResponse } from "next";
import { serializeMdx } from "../../utils/mdx";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await serializeMdx(req.body));
};
