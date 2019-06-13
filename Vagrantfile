# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.8"

MOUNT_OPTIONS = if Vagrant::Util::Platform.linux? then
                  ['rw', 'vers=3', 'tcp', 'nolock']
                else
                  ['vers=3', 'udp']
                end

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "lib"

  config.vm.synced_folder '.', "/vagrant", type: "nfs", mount_options: MOUNT_OPTIONS

  config.vm.network "private_network", ip: "192.168.10.100"

  config.vm.provider :virtualbox do |vb|
    vb.memory = 1024
    vb.cpus = 2
  end

  config.vm.provision :shell do |shell|
    shell.inline = <<-SHELL
      grep "cd /vagrant" /home/vagrant/.bashrc || echo "cd /vagrant" >> /home/vagrant/.bashrc
    SHELL
  end

  config.vm.provision "ansible" do |ansible|
      ansible.playbook = "deployment/ansible/climate-change-components.yml"
      ansible.galaxy_role_file = "deployment/ansible/roles.yml"
  end
end
