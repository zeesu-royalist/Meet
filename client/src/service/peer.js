class PeerService {
  constructor() {
    this.peer = null;
    this.initPeer();
  }

  initPeer() {
    if (this.peer) {
      try {
        this.peer.close();
      } catch (e) {
        console.error("Error closing existing peer:", e);
      }
    }

    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
    });
    return this.peer;
  }

  async getOffer() {
    if (!this.peer) this.initPeer();
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async getAnswer(offer) {
    if (!this.peer) this.initPeer();
    if (this.peer.signalingState !== "stable") {
      await Promise.all([
        this.peer.setLocalDescription({ type: "rollback" }),
        this.peer.setRemoteDescription(new RTCSessionDescription(offer)),
      ]);
    } else {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    }
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      if (this.peer.signalingState === "have-local-offer") {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }
  }

  async addIceCandidate(candidate) {
    if (this.peer && candidate) {
      try {
        await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("Error adding ice candidate:", e);
      }
    }
  }

  resetPeer() {
    if (this.peer) {
      this.peer.ontrack = null;
      this.peer.onicecandidate = null;
      this.peer.onnegotiationneeded = null;
      try {
        this.peer.close();
      } catch (e) {
        console.error("Error closing peer connection:", e);
      }
      this.peer = null;
    }
    return this.initPeer();
  }
}

const peerServiceInstance = new PeerService();
export default peerServiceInstance;

