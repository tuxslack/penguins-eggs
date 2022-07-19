/**
 * https://stackoverflow.com/questions/23876782/how-do-i-split-a-typescript-class-into-multiple-files
 */

import Sequence from '../krill-sequence'
import { exec } from '../../lib/utils'
import Utils from '../../classes/utils'

/**
   * bootloader
   * @param target
   * @param options
   */
export default async function bootloader(this: Sequence) {
    /**
     * update-grub it's just a script:
       #!/bin/sh
       set -e
       exec grub-mkconfig -o /boot/grub/grub.cfg "$@"
     *
     * not present on Arch, so we use grub-mkconfig
     */

    await exec(`chroot ${this.installTarget} grub-install ${this.partitions.installationDevice} ${this.toNull}`, this.echo)
    await exec(`chroot ${this.installTarget} grub-mkconfig -o /boot/grub/grub.cfg ${this.toNull}`, this.echo)
    await exec(`sleep 1 ${this.toNull}`, this.echo)

    // let echoYes = Utils.setEcho(true)
    // await exec(`chroot ${this.installTarget} grub-install ${this.partitions.installationDevice} ${this.toNull}`, echoYes)
    // await exec(`chroot ${this.installTarget} grub-mkconfig -o /boot/grub/grub.cfg ${this.toNull}`, echoYes)
    // await exec(`sleep 1 ${this.toNull}`, echoYes)
}
