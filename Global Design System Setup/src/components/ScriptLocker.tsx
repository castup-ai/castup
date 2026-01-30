import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Shield, Upload, FileText, Share2, Download, Trash2, Search, Lock, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

export default function ScriptLocker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const mockFiles = [
    {
      id: '1',
      name: 'The Last Summer - Final Draft.pdf',
      date: 'Oct 15, 2024',
      size: '2.4 MB',
      sharedWith: ['Emma Richardson', 'Marcus Chen'],
      locked: true,
    },
    {
      id: '2',
      name: 'Midnight Dreams - Script v3.pdf',
      date: 'Sept 28, 2024',
      size: '1.8 MB',
      sharedWith: ['Sarah Mitchell'],
      locked: true,
    },
    {
      id: '3',
      name: 'Character Profiles.docx',
      date: 'Oct 1, 2024',
      size: '842 KB',
      sharedWith: [],
      locked: false,
    },
    {
      id: '4',
      name: 'Production Notes.pdf',
      date: 'Oct 10, 2024',
      size: '1.2 MB',
      sharedWith: ['Emma Richardson', 'James Wilson', 'Lisa Torres'],
      locked: true,
    },
  ];

  const handleShareFile = (fileId: string) => {
    setSelectedFile(fileId);
    setShowShareDialog(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
            Secure Script Locker
          </h1>
        </div>
        <p className="text-[#6B6B6B] text-lg">
          Protect your scripts with enterprise-grade security
        </p>
      </div>

      {/* Security Banner */}
      <div className="mb-6 p-6 bg-gradient-to-r from-[#28A745]/10 to-[#28A745]/5 rounded-2xl border border-[#28A745]/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#28A745] flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-[#3C3C3C] mb-1" style={{ fontWeight: 600 }}>
              Your Files Are Protected
            </h3>
            <p className="text-[#6B6B6B]">
              All files are encrypted end-to-end. Control who can view or download your work with granular permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-lg"
          />
        </div>

        <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload File
        </Button>
      </div>

      {/* Files Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF8F0] border-b border-[rgba(0,0,0,0.08)]">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-[#6B6B6B]" style={{ fontWeight: 600 }}>
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#6B6B6B]" style={{ fontWeight: 600 }}>
                  Date Uploaded
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#6B6B6B]" style={{ fontWeight: 600 }}>
                  Size
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#6B6B6B]" style={{ fontWeight: 600 }}>
                  Shared With
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#6B6B6B]" style={{ fontWeight: 600 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockFiles.map((file, idx) => (
                <tr
                  key={file.id}
                  className={`border-b border-[rgba(0,0,0,0.08)] hover:bg-[#FFF8F0] transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF7A5A]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#FF7A5A]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#3C3C3C]" style={{ fontWeight: 500 }}>
                            {file.name}
                          </span>
                          {file.locked && (
                            <Lock className="w-4 h-4 text-[#28A745]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6B6B6B]">{file.date}</td>
                  <td className="px-6 py-4 text-[#6B6B6B]">{file.size}</td>
                  <td className="px-6 py-4">
                    {file.sharedWith.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-[#6B6B6B]">{file.sharedWith.length} people</span>
                      </div>
                    ) : (
                      <span className="text-[#6B6B6B]">Private</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleShareFile(file.id)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[#FF7A5A]/10 hover:text-[#FF7A5A]"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[#FF7A5A]/10 hover:text-[#FF7A5A]"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-50 hover:text-[#DC3545]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mt-6 p-12 border-2 border-dashed border-[rgba(0,0,0,0.2)] rounded-2xl bg-white hover:border-[#FF7A5A] hover:bg-[#FFF8F0] transition-all cursor-pointer">
        <div className="text-center">
          <Upload className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4" />
          <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>
            Drop files here or click to upload
          </h3>
          <p className="text-[#6B6B6B] mb-4">
            Supports PDF, DOC, DOCX files up to 50MB
          </p>
          <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg">
            Choose Files
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
              Secure File Sharing
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Search Users */}
            <div>
              <Label className="mb-2">Share with users</Label>
              <Input
                placeholder="Search by name or email..."
                className="h-12 rounded-lg"
              />
            </div>

            {/* Permissions */}
            <div>
              <Label className="mb-2">Permissions</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:bg-[#FFF8F0]">
                  <input type="radio" name="permission" className="w-4 h-4" defaultChecked />
                  <div>
                    <div className="text-[#3C3C3C]" style={{ fontWeight: 500 }}>View Only</div>
                    <div className="text-sm text-[#6B6B6B]">Can view but not download</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:bg-[#FFF8F0]">
                  <input type="radio" name="permission" className="w-4 h-4" />
                  <div>
                    <div className="text-[#3C3C3C]" style={{ fontWeight: 500 }}>View & Download</div>
                    <div className="text-sm text-[#6B6B6B]">Can view and download the file</div>
                  </div>
                </label>
              </div>
            </div>

            {/* External Link */}
            <div className="pt-4 border-t border-[rgba(0,0,0,0.1)]">
              <Label className="mb-2">Or create a secure link</Label>
              <div className="flex gap-2">
                <Input
                  value="https://castup.app/share/abc123xyz"
                  readOnly
                  className="h-12 rounded-lg"
                />
                <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg px-6">
                  Copy
                </Button>
              </div>
              <p className="text-sm text-[#6B6B6B] mt-2">
                Link expires in 7 days • Access requires verification
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowShareDialog(false)}
                className="flex-1 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg h-12"
              >
                Share File
              </Button>
              <Button
                onClick={() => setShowShareDialog(false)}
                variant="outline"
                className="px-6 rounded-lg h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
