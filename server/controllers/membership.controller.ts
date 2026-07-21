import { Request, Response } from "express";
import { MembershipService } from "../services/membership.service";

export class MembershipController {
  private membershipService = new MembershipService();

  getAllMemberships = async (req: Request, res: Response) => {
    try {
      const memberships = await this.membershipService.getAllMemberships();
      res.status(200).json(memberships);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  createMembership = async (req: Request, res: Response) => {
    try {
      const membership = await this.membershipService.createMembership(req.body);
      res.status(201).json(membership);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getMembershipById = async (req: Request, res: Response) => {
    try {
      const membership = await this.membershipService.getMembershipById(req.params.id as string);
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json(membership);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateMembership = async (req: Request, res: Response) => {
    try {
      const membership = await this.membershipService.updateMembership(req.params.id as string, req.body);
      res.status(200).json(membership);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteMembership = async (req: Request, res: Response) => {
    try {
      await this.membershipService.deleteMembership(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
