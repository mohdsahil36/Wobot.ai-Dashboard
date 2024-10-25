export interface Health {
  cloud: string;
  device: string;
  _id: string;
  id: string;
}

export interface Camera {
  name: string;
  location: string;
  recorder: string;
  tasks: string;
  status: string;
  hasWarning: boolean;
  health: Health;
  _id: string;
  id: string;
}

export interface CameraResponse {
  data: Camera[];
}
